"use server";

import { signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { auth } from "../_lib/auth";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();

  if (!session)
    throw new Error("You must be logged in to update your profile ");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid nationalID");

  const updateGuestData = {
    nationalID,
    countryFlag,
    nationality,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateGuestData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");

  return data;
}

export async function updateReservation(formData) {
  const bookingId = Number(formData.get("bookingId"));

  const session = await auth();

  if (!session)
    throw new Error("You must be logged in to delete the reservation ");

  const guestBookings = await getBookings(session.user.guestId);
  const getBookingsIds = guestBookings.map((booking) => booking.id);

  if (!getBookingsIds.includes(bookingId))
    throw new Error("You are not allow to update this booking");

  const updatedData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

export async function createReservation(reservationData, formData) {
  const session = await auth();

  if (!session)
    throw new Error("You must be logged in to reserve the reservation ");

  const newReservation = {
    ...reservationData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: reservationData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newReservation]);

  if (error) {
    throw new Error("Reservation could not be created");
  }

  revalidatePath(`/cabins/${reservationData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session)
    throw new Error("You must be logged in to delete the reservation ");

  const guestBookings = await getBookings(session.user.guestId);
  const getBookingsIds = guestBookings.map((booking) => booking.id);

  if (!getBookingsIds.includes(bookingId))
    throw new Error("You are not allow to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}
