import cron from "node-cron";
import ActiveService from "../database/models/activeService.model";
import Client from "../database/models/client.model";
import { cacheData } from "../redis/redis.cache";
import config from "config";
//
export function getActiveServiceJob() {
  cron.schedule("0 0 * * *", async () => {
    console.log("Job executed at 12 AM!");

    //
    const activeServices = await ActiveService.find({
      expireDate: { $gt: Date.now() },
      serviceId: config.get("SERVICE_ID"),
    });

    const clientId = activeServices.map((service) => service.clientId);
    const _establishments = await Client.find({
      clientId: { $in: clientId },
    });

    let estIds: any = [];
    _establishments.forEach((est) => {
      estIds = est.establishmentId.map((item) => ({
        estId: item,
        estUrl: est.establishmentUrl,
        clientId: est.clientId,
      }));
    });

    //
    await cacheData({
      key: "acs_01",
      value: JSON.stringify(estIds.flat()),
    });
  });
  return;
}
