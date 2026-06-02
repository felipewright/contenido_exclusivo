import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, videoId, eventId } = await req.json();

  if (!token || !videoId || !eventId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("tokens_table")
    .select("*")
    .eq("token", token)
    .eq("event_id", eventId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  if (data.used) {
    return NextResponse.json({ error: "Already used" }, { status: 400 });
  }

  const { error: updateError } = await supabase
    .from("tokens_table")
    .update({
      used: true,
      selected_video: videoId,
    })
    .eq("token", token)
    .eq("event_id", eventId);

  if (updateError) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}