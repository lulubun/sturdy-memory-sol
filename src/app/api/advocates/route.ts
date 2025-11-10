import { asc, ilike, or, sql, count } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const params = new URL(req.url).searchParams
  const page: number = parseInt(params.get("page") || "0");
  const searchTerm = params.get("search") || "";
  const initial = params.get("initial") || "";
  if (initial) {
    const allAdvocates = await (db.select().from(advocates) as any).orderBy(asc(advocates.phoneNumber));
    const totalCount = allAdvocates.length;
    const data = allAdvocates.slice(0, 10);
    return Response.json({ data, totalCount });
  }
  let wheres;
  if (searchTerm) {
    wheres = or(
      ilike(advocates.firstName, `%${searchTerm}%`),
      ilike(advocates.lastName, `%${searchTerm}%`),
      ilike(advocates.city, `%${searchTerm}%`),
      ilike(advocates.degree, `%${searchTerm}%`),
      sql`${advocates.specialties}::text ilike ${'%' + searchTerm + '%'}`
    );
  }
  const data = await (db.select().from(advocates) as any).where(wheres).limit(10).offset((page ? page : 0) * 10).orderBy(asc(advocates.phoneNumber));

  return Response.json({ data });
}
