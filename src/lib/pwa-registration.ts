const delegatedPreviewHost = "id-preview--f60b67eb-fa3e-47a0-b424-b52e1fd3ec23.lovable.app";

function isLovablePreviewHost(hostname: string) {
  const firstLabel = hostname.split(".")[0] ?? "";
  const previewDomains = ["lovable.app", "gpt-eng.com", "gptengineer.run"];
  const matchesPreviewDomain = previewDomains.some((domain) => hostname.endsWith(`.${domain}`));
  return hostname === delegatedPreviewHost || (matchesPreviewDomain && /^(?:id-preview|preview)(?:-[a-z0-9]+)?--.+$/.test(firstLabel));
}

function mustRefuseServiceWorker(hostname: string, inFrame: boolean) {
  const lowerHost = hostname.toLowerCase();
  const devProject = /^project--[a-z0-9]+-dev\.(?:lovable\.app|gpt-eng\.com|gptengineer\.run)$/.test(lowerHost);
  const hostedPreview = isLovablePreviewHost(lowerHost);
  const lovableProject = lowerHost === "lovableproject.com" || lowerHost.endsWith(".lovableproject.com") || lowerHost === "lovableproject-dev.com" || lowerHost.endsWith(".lovableproject-dev.com");
  const beta = lowerHost === "beta.lovable.dev" || lowerHost.endsWith(".beta.lovable.dev");
  return !import.meta.env.PROD || inFrame || hostedPreview || devProject || lovableProject || beta || new URLSearchParams(window.location.search).get("sw") === "off";
}

async function removeAppServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  const workerUrl = new URL("/sw.js", window.location.origin).href;
  const registrations = await navigator.serviceWorker.getRegistrations();
  const appRegistrations = registrations.filter((registration) => {
    const workers = [registration.installing, registration.waiting, registration.active];
    return workers.some((worker) => worker?.scriptURL === workerUrl);
  });
  await Promise.allSettled(appRegistrations.map((registration) => registration.unregister()));
}

export function registerAppServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  const hostname = window.location.hostname.toLowerCase();
  const inFrame = window.self !== window.top;
  if (mustRefuseServiceWorker(hostname, inFrame)) {
    void removeAppServiceWorker().catch(() => undefined);
    return;
  }
  void navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => undefined);
}