import Image from "next/image";
import Link from "next/link";
import type { Submission } from "@prisma/client";
import { isDatabaseConfigured } from "@/lib/database";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const logoUrl = "/melogo.png";

type LeadFilter = "all" | "today" | "booked";
const PAGE_SIZE = 5;

function statLabel({
  value,
  label,
  href,
  active,
}: {
  value: number;
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-lg border px-5 py-4 shadow-[0_12px_30px_-24px_rgba(18,110,110,0.5)] transition hover:-translate-y-0.5 hover:border-[#126e6e] ${
        active
          ? "border-[#126e6e] bg-[#126e6e] text-white"
          : "border-[#d7eeee] bg-white text-[#163030]"
      }`}
    >
      <p
        className={`font-display t-h3 font-semibold leading-none ${
          active ? "text-white" : "text-[#126e6e]"
        }`}
      >
        {value}
      </p>
      <p
        className={`mt-1 t-caption font-bold uppercase ${
          active ? "text-white/80" : "text-[#5b7676]"
        }`}
      >
        {label}
      </p>
    </Link>
  );
}

function Field({
  label,
  value,
  wide = false,
}: {
  label: string;
  value?: string | null;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2 xl:col-span-3" : ""}>
      <p className="t-caption font-bold uppercase text-[#5f7a7a]">{label}</p>
      <p className="mt-1 break-words t-body font-semibold leading-6 text-[#163030]">
        {value || "-"}
      </p>
    </div>
  );
}

function PaymentBadge({ status }: { status?: string | null }) {
  const value = (status || "").trim();
  const key = value.toLowerCase();
  const styles =
    key === "paid"
      ? "border-[#126e6e]/20 bg-[#e3f9f9] text-[#126e6e]"
      : key === "unpaid"
        ? "border-[#e0912f]/30 bg-[#fff3e0] text-[#b5701c]"
        : key === "failed"
          ? "border-[#c0392b]/25 bg-[#fdecea] text-[#c0392b]"
          : "border-[#d7eeee] bg-[#eef4f4] text-[#5b7676]";
  return (
    <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 t-caption font-bold uppercase tracking-wide ${styles}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {value || "Unknown"}
    </span>
  );
}

function fmt(date: Date) {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getFriendlyDatabaseError(error: unknown) {
  const message = error instanceof Error ? error.message : "";

  if (message.includes("Can't reach database server")) {
    return "Database connection failed. Please restart the dev server after changing .env, and confirm the Postgres database is reachable.";
  }

  if (message.includes("does not exist in the current database")) {
    return "Database is connected, but the submissions table is not created yet. Run npm run db:push.";
  }

  if (message.includes("Environment variable not found")) {
    return "DATABASE_URL is missing from .env.";
  }

  return "Database is not ready yet. Check DATABASE_URL and run npm run db:push.";
}

function getInitials(firstName: string, lastName?: string | null) {
  return `${firstName.charAt(0)}${lastName?.charAt(0) || ""}`.toUpperCase();
}

function getFilter(value: string | string[] | undefined): LeadFilter {
  const filter = Array.isArray(value) ? value[0] : value;
  if (filter === "today" || filter === "booked") return filter;
  return "all";
}

function getPage(value: string | string[] | undefined) {
  const rawPage = Array.isArray(value) ? value[0] : value;
  const page = Number.parseInt(rawPage || "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

function pageHref(filter: LeadFilter, page: number) {
  return `/admin-dashboard?filter=${filter}&page=${page}#leads`;
}

async function getSubmissions() {
  if (!isDatabaseConfigured()) {
    return {
      databaseReady: false,
      databaseError: "",
      submissions: [] as Submission[],
    };
  }

  try {
    return {
      databaseReady: true,
      databaseError: "",
      submissions: await prisma.submission.findMany({
        orderBy: { createdAt: "desc" },
        take: 250,
      }),
    };
  } catch (error) {
    return {
      databaseReady: false,
      databaseError: getFriendlyDatabaseError(error),
      submissions: [] as Submission[],
    };
  }
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string | string[]; page?: string | string[] }>;
}) {
  const params = await searchParams;
  const activeFilter = getFilter(params.filter);
  const requestedPage = getPage(params.page);
  const { databaseReady, databaseError, submissions } = await getSubmissions();

  const todayKey = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const todayCount = submissions.filter((item) => {
    const key = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(item.createdAt);
    return key === todayKey;
  }).length;

  const bookedCount = submissions.filter(
    (item) => item.paymentStatus === "Paid" && item.appointmentDate && item.appointmentTime,
  ).length;

  const filteredSubmissions = submissions.filter((item) => {
    if (activeFilter === "today") {
      const key = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(item.createdAt);
      return key === todayKey;
    }

    if (activeFilter === "booked") {
      return Boolean(item.appointmentDate && item.appointmentTime);
    }

    return true;
  });

  const uniquePhones = new Set(filteredSubmissions.map((item) => item.phone)).size;
  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageEnd = pageStart + PAGE_SIZE;
  const visibleSubmissions = filteredSubmissions.slice(pageStart, pageEnd);

  const filterTitle =
    activeFilter === "today"
      ? "Today Leads"
      : activeFilter === "booked"
        ? "Booked Slot Leads"
        : "All Form Submissions";

  return (
    <main className="min-h-screen bg-[#f7fbfb] text-[#163030]">
      <header className="sticky top-0 z-40 border-b border-[#d7eeee] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={logoUrl}
              alt="It's Me & You"
              width={142}
              height={56}
              className="h-12 w-auto object-contain"
              priority
            />
            <div className="border-l border-[#d7eeee] pl-4">
              <p className="t-caption font-bold uppercase text-[#42a9a9]">
                Admin Dashboard
              </p>
              <h1 className="font-display t-h2 text-[#163030]">
                Consultation Leads
              </h1>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-2 t-btn font-bold">
            <Link
              href="/api/submissions"
              className="rounded-full border border-[#126e6e] px-4 py-2 text-[#126e6e] transition hover:bg-[#e3f9f9]"
            >
              Export CSV
            </Link>
            <Link
              href="/"
              className="rounded-full bg-[#126e6e] px-4 py-2 text-white transition hover:bg-[#0d5252]"
            >
              Website
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-7 sm:px-7">
        {!databaseReady && (
          <div className="mb-6 rounded-lg border border-[#ffd6a8] bg-[#fff8ef] px-5 py-4 t-small text-[#6b4a18]">
            {databaseError ? (
              <>
                <span className="font-semibold">{databaseError}</span>
                <br />
              </>
            ) : null}
            Add your real PostgreSQL connection string to{" "}
            <code className="font-bold">DATABASE_URL</code>, then run{" "}
            <code className="font-bold">npm run db:push</code>.
          </div>
        )}

        <div id="overview" className="grid scroll-mt-28 gap-4 sm:grid-cols-3">
          {statLabel({
            value: submissions.length,
            label: "All leads",
            href: "/admin-dashboard?filter=all&page=1#leads",
            active: activeFilter === "all",
          })}
          {statLabel({
            value: todayCount,
            label: "Today leads",
            href: "/admin-dashboard?filter=today&page=1#leads",
            active: activeFilter === "today",
          })}
          {statLabel({
            value: bookedCount,
            label: "Booked slots",
            href: "/admin-dashboard?filter=booked&page=1#leads",
            active: activeFilter === "booked",
          })}
        </div>

        <div id="leads" className="mt-6 scroll-mt-28 rounded-lg border border-[#d7eeee] bg-white">
          <div className="flex flex-col gap-2 border-b border-[#d7eeee] px-5 py-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display t-h3 text-[#163030]">
                {filterTitle}
              </h2>
            </div>
            <p className="t-small font-semibold text-[#5b7676]">
              {filteredSubmissions.length} leads - {uniquePhones} unique phone numbers
            </p>
          </div>

          <div className="divide-y divide-[#edf5f5]">
            {visibleSubmissions.length === 0 ? (
              <div className="px-5 py-12 text-center text-[#5b7676]">
                No leads found for this filter.
              </div>
            ) : (
              visibleSubmissions.map((item) => (
                <details key={item.id} className="group">
                  <summary className="grid cursor-pointer list-none gap-4 px-5 py-5 transition hover:bg-[#f7fbfb] lg:grid-cols-[minmax(260px,1.4fr)_minmax(150px,0.7fr)_minmax(240px,1fr)_auto] lg:items-center [&::-webkit-details-marker]:hidden">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 flex-none place-items-center rounded-full bg-[#126e6e] font-display t-h5 font-semibold text-white">
                        {getInitials(item.firstName, item.lastName)}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="t-h4 font-bold text-[#126e6e]">
                            {[item.firstName, item.lastName].filter(Boolean).join(" ")}
                          </h3>
                          <PaymentBadge status={item.paymentStatus} />
                        </div>
                        <p className="mt-1 t-small font-semibold text-[#5b7676]">
                          {fmt(item.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="t-caption font-bold uppercase text-[#5f7a7a]">
                        Phone
                      </p>
                      <p className="mt-1 t-body font-semibold text-[#163030]">
                        {item.phone}
                      </p>
                    </div>

                    <div className="lg:pr-6">
                      <p className="t-caption font-bold uppercase text-[#5f7a7a]">
                        Email
                      </p>
                      <p className="mt-1 break-all t-body font-semibold text-[#163030]">
                        {item.email || "-"}
                      </p>
                    </div>

                    <span className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#126e6e] px-4 py-2 t-btn font-bold text-[#126e6e] transition group-open:bg-[#126e6e] group-open:text-white">
                      View details
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-open:rotate-180"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-[#edf5f5] bg-[#fbfefe] px-5 py-5">
                    <div className="mb-5 flex flex-wrap gap-2 t-btn font-bold">
                      <a
                        href={`tel:${item.phone}`}
                        className="rounded-full bg-[#126e6e] px-4 py-2 text-white transition hover:bg-[#0d5252]"
                      >
                        Call {item.phone}
                      </a>
                      {item.email && (
                        <a
                          href={`mailto:${item.email}`}
                          className="rounded-full border border-[#126e6e] px-4 py-2 text-[#126e6e] transition hover:bg-[#e3f9f9]"
                        >
                          Send email
                        </a>
                      )}
                    </div>

                    <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
                      <Field label="Therapist" value={item.prevConsult} />
                      <Field label="Service" value={item.symptomType} />
                      <Field label="Amount" value={item.hadSurgery} />
                      <Field
                        label="Payment"
                        value={[item.paymentStatus, item.paymentId].filter(Boolean).join(" · ")}
                      />
                      <Field
                        label="Appointment"
                        value={[item.appointmentDate, item.appointmentTime]
                          .filter(Boolean)
                          .join(" at ")}
                      />
                      <Field label="Clinic" value={item.location} />
                      <Field label="TeleCRM" value={item.telecrmStatus} />
                      <Field label="Page URL" value={item.pageUrl} wide />
                    </div>
                  </div>
                </details>
              ))
            )}
          </div>

          {filteredSubmissions.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-[#d7eeee] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="t-small font-semibold text-[#5b7676]">
                Showing {pageStart + 1}-{Math.min(pageEnd, filteredSubmissions.length)} of{" "}
                {filteredSubmissions.length} leads
              </p>

              <div className="flex items-center gap-2 t-btn font-bold">
                {currentPage > 1 ? (
                  <Link
                    href={pageHref(activeFilter, currentPage - 1)}
                    className="rounded-full border border-[#126e6e] px-4 py-2 text-[#126e6e] transition hover:bg-[#e3f9f9]"
                  >
                    Previous
                  </Link>
                ) : (
                  <span className="cursor-not-allowed rounded-full border border-[#d7eeee] px-4 py-2 text-[#9ab0b0]">
                    Previous
                  </span>
                )}

                <span className="rounded-full bg-[#e3f9f9] px-4 py-2 text-[#126e6e]">
                  Page {currentPage} of {totalPages}
                </span>

                {currentPage < totalPages ? (
                  <Link
                    href={pageHref(activeFilter, currentPage + 1)}
                    className="rounded-full bg-[#126e6e] px-4 py-2 text-white transition hover:bg-[#0d5252]"
                  >
                    Next
                  </Link>
                ) : (
                  <span className="cursor-not-allowed rounded-full bg-[#edf5f5] px-4 py-2 text-[#9ab0b0]">
                    Next
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
