function unauthorizedResponse() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Niat Umroh Admin"',
    },
  });
}

export function adminAuthResponse(request) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return Response.json(
      { error: "Admin credentials are not configured" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  try {
    const base64 = authHeader.replace("Basic ", "");
    const decoded = atob(base64);
    const [inputUsername, ...passwordParts] = decoded.split(":");
    const inputPassword = passwordParts.join(":");

    if (inputUsername !== username || inputPassword !== password) {
      return unauthorizedResponse();
    }

    return null;
  } catch {
    return unauthorizedResponse();
  }
}