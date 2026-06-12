function unauthorizedResponse() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Niat Umroh Admin"',
    },
  });
}

function isAuthorized(request) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return false;
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false;
  }

  try {
    const base64 = authHeader.replace("Basic ", "");
    const decoded = atob(base64);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return false;
    }

    const inputUsername = decoded.slice(0, separatorIndex);
    const inputPassword = decoded.slice(separatorIndex + 1);

    return inputUsername === username && inputPassword === password;
  } catch {
    return false;
  }
}

export default function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const isAdminPage =
    pathname === "/admin" || pathname.startsWith("/admin/");

  const isEnquiriesApi =
    pathname === "/api/enquiries" || pathname.startsWith("/api/enquiries/");

  const isPackageWriteApi =
    (pathname === "/api/packages" || pathname.startsWith("/api/packages/")) &&
    request.method !== "GET";

  const shouldProtect =
    isAdminPage || isEnquiriesApi || isPackageWriteApi;

  if (!shouldProtect) {
    return;
  }

  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    return new Response("Admin credentials are not configured", {
      status: 500,
    });
  }

  if (!isAuthorized(request)) {
    return unauthorizedResponse();
  }

  return;
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/enquiries",
    "/api/enquiries/:path*",
    "/api/packages",
    "/api/packages/:path*",
  ],
};