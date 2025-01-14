import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="AppFooter">
      <Typography.Link href="tel:+123456789">View Map</Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
      View Map
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        About Us
      </Typography.Link>
    </div>
  );
}
export default AppFooter;
