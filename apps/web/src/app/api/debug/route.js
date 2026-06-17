export async function loader() {
  return Response.json({
    ok: true,
    message: "API debug route works",
  });
}

