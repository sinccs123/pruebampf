'use client';

import { CONFIG } from '@/lib/config';
import { createRef, useCallback } from 'react';

import ReCAPTCHA from 'react-google-recaptcha';

interface RecaptchaProps {
  changeCallback: (captchaCode: string | null) => void;
}
export default function Recaptcha({ changeCallback }: RecaptchaProps) {
  const onReCAPTCHAChange = useCallback(
    (captchaCode: string | null) => {
      if (!captchaCode) {
        return;
      }
      changeCallback(captchaCode);
    },
    [changeCallback],
  );

  const onReCAPTCHAExpired = useCallback(() => {
    changeCallback(null);
  }, [changeCallback]);

  return (
    <ReCAPTCHA
      size='normal'
      sitekey={CONFIG.GOOGLE_RECAPTCHA_SITE_KEY!}
      onChange={onReCAPTCHAChange}
      onExpired={onReCAPTCHAExpired}
    />
  );
}
