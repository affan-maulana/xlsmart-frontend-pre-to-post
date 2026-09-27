import { z } from 'zod';

export const pretopostSubmitSchema = z.object({
  packageId: z.string().min(1, 'Pilih paket terlebih dahulu'),
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{10,15}$/.test(val), {
      message: 'Nomor HP harus 10-15 digit angka',
    }),
});

export type PretopostSubmitInput = z.infer<typeof pretopostSubmitSchema>;
