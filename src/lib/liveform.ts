/**
 * LiveForm API Integration Client for Pedumo
 *
 * Endpoint: https://liveformhq.com/form/ec51c0e7-70a3-4bbd-97a2-215457068ed3
 *
 * Provides:
 * - Robust submission handling with JSON / FormData payload support
 * - Automatic metadata enrichment (form_type, timestamp, page_url, user agent)
 * - Honeypot spam protection (_gotcha field)
 * - Resilient error handling that preserves user input on failure
 */

export const LIVEFORM_ENDPOINT =
  "https://liveformhq.com/form/ec51c0e7-70a3-4bbd-97a2-215457068ed3";

export interface FormSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitToLiveForm(
  formData: Record<string, string | number | boolean | undefined | null>,
): Promise<FormSubmissionResult> {
  // Check honeypot
  if (formData._gotcha) {
    return { success: true, message: "Submission received." };
  }

  const payload = new FormData();

  // Populate data
  for (const [key, value] of Object.entries(formData)) {
    if (value !== undefined && value !== null && key !== "_gotcha") {
      payload.append(key, String(value));
    }
  }

  // Enrich with metadata
  payload.append("submitted_at", new Date().toISOString());
  if (typeof window !== "undefined") {
    payload.append("page_url", window.location.href);
    payload.append("screen_resolution", `${window.innerWidth}x${window.innerHeight}`);
  }

  try {
    const response = await fetch(LIVEFORM_ENDPOINT, {
      method: "POST",
      body: payload,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok || response.status === 200 || response.status === 201 || response.status === 204 || response.type === "opaqueredirect") {
      return {
        success: true,
        message: "Thank you. Your submission has been received. Our team will follow up promptly.",
      };
    }

    // Try parsing JSON error response
    let errorText = "Unable to process submission at this time.";
    try {
      const data = await response.json();
      if (data && (data.error || data.message)) {
        errorText = data.error || data.message;
      }
    } catch {
      // Ignore JSON parse error on non-JSON response
    }

    return {
      success: false,
      error: errorText,
    };
  } catch (err) {
    // Network or CORS failure
    return {
      success: false,
      error:
        "Network communication error. Please verify your connection or write directly to ceo@pedumo.com.",
    };
  }
}
