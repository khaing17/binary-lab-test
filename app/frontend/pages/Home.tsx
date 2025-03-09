import LeftBar from "../components/left-bar";
import Main from "../components/main";
import SideBar from "../components/side-bar";
import TimelineLayout from "../layouts/timeline-layout";

export default function Home() {
  return (
    <TimelineLayout>
      <LeftBar />
      <Main />
      <SideBar />
    </TimelineLayout>
  );
}
