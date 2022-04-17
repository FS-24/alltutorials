export function Loading() {
  return (
    <div className="d-flex align-items-center bg-secondary text-light">
      <strong>Loading...</strong>
      <div
        className="spinner-border ms-auto"
        role="status"
        aria-hidden="true"
      ></div>
    </div>
  );
}
