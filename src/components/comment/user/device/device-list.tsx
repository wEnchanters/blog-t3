import { cookies } from "next/headers";
import DeviceListClient from "~/components/comment/user/device/device-list-client";
import { fetchLoggedUserInfo, fetchUserDevice } from "~/server/fetch/user";

const DeviceList = async () => {
  const sessionId = cookies().get("session-id")?.value;
  let authenticators = null;
  if (sessionId) {
    const user = (await fetchLoggedUserInfo(sessionId)).data;
    if (!user) return
    authenticators = (await fetchUserDevice(user.id)).data
  }
  return authenticators ? (
    <DeviceListClient devices={authenticators} />
  ) : (
    <p className="text-base font-medium text-primary">Session 消失了</p>
  );
};

export default DeviceList;
