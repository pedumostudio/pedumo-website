const LIVEFORM_ENDPOINT =
  process.env.LIVEFORM_ENDPOINT ??
  "https://liveformhq.com/form/ec51c0e7-70a3-4bbd-97a2-215457068ed3";

/**
 * Forwards a submission to LiveForm, which delivers it to the company email.
 * Runs server-side only. Failures are logged but never block the user —
 * the submission is always persisted in our own database first.
 */
export async function sendToLiveForm(
  formName: string,
  data: Record<string, string | null | undefined>,
): Promise<void> {
  const params = new URLSearchParams();
  params.set("form_name", formName);
  for (const [key, value] of Object.entries(data)) {
    if (value != null && value !== "") {
      params.set(key, value);
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(LIVEFORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: params.toString(),
      // Do not let a slow third party hang the request forever.
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error(`LiveForm forwarding failed (${formName}): HTTP ${res.status}`);
    }
  } catch (error) {
    console.error(`LiveForm forwarding error (${formName}):`, error);
  } finally {
    clearTimeout(timeout);
  }
}
