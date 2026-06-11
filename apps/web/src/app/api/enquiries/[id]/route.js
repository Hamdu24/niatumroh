import sql from "@/app/api/utils/sql";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    const validStatuses = ["new", "contacted", "converted", "closed"];
    if (!validStatuses.includes(status)) {
      return Response.json({ error: "Invalid status." }, { status: 400 });
    }

    await sql`UPDATE enquiries SET status = ${status} WHERE id = ${id}`;
    return Response.json({ success: true });
  } catch (error) {
    console.error("Enquiry PATCH error:", error);
    return Response.json(
      { error: "Failed to update status." },
      { status: 500 },
    );
  }
}
