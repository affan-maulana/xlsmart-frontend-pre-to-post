'use client';

import { useState } from 'react';
import { apiClient, ApiError } from '@/lib/api-client';
import type { SubmitPreToPostResponse } from '../_service/pretopost.service';
import {
  pretopostSubmitSchema,
  type PretopostSubmitInput,
} from '../_validation/pretopost.schema';

export type FieldErrors = Partial<Record<keyof PretopostSubmitInput, string>>;

export function usePretopostSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function submit(payload: PretopostSubmitInput): Promise<SubmitPreToPostResponse | null> {
    const result = pretopostSubmitSchema.safeParse(payload);

    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof PretopostSubmitInput;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);
      return null;
    }

    setFieldErrors({});
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await apiClient.post<SubmitPreToPostResponse>('/api/pretopost', {
        endpoint: 'submit',
        ...result.data,
      });
      return response;
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Terjadi kesalahan';
      setError(message);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, error, fieldErrors };
}
