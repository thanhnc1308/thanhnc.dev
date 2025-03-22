import guestModel from '@/db/models/guest.model';
import { GuestConfirmationStatus, GuestSource } from '@/types/guest';
import { hash } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get('file') as File;

    if (!file) {
      return NextResponse.json('No file uploaded', {
        status: 400,
      });
    }

    const { name } = file;
    const guestSource = name.includes('groom')
      ? GuestSource.Groom
      : GuestSource.Bride;

    const text = await file.text();
    const { data: parsedData } = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
    });

    const allGuests = parsedData
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((guest: any) => guest.GuestName?.trim())
      .filter(Boolean);

    const newGuests = allGuests.map((guest) => {
      return {
        _id: hash(`${guestSource}-${guest}`),
        name: guest,
        memberCount: 1,
        status: GuestConfirmationStatus.Pending,
        invited: false,
        guestSource,
      };
    });

    await guestModel.bulkWrite(
      newGuests.map((guest) => ({
        updateOne: {
          filter: { _id: guest._id },
          update: { $set: guest },
          upsert: true,
        },
      })),
    );

    return NextResponse.json('Successfully import', {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error uploading file', {
      status: 500,
    });
  }
}
