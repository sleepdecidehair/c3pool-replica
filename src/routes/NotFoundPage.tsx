import { Button } from "@arco-design/web-react";
import { useNavigate } from "react-router";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found__code">404</div>
      <h1 className="not-found__title">Page not found</h1>
      <Button type="primary" onClick={() => navigate("/")}>
        Back to home
      </Button>
    </div>
  );
}
