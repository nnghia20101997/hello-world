export class ConnectDatabaseMongo {
    constructor() { }

    public connectMongo(): string {
        let result: string = `mongodb://${process.env.CONFIG_MONGO_USERNAME_DEVICE_MANAGEMENT}:${encodeURIComponent(process.env.CONFIG_MONGO_PASSWORD_DEVICE_MANAGEMENT)}@${process.env.CONFIG_MONGO_HOST_DEVICE_MANAGEMENT}:${process.env.CONFIG_MONGO_PORT_DEVICE_MANAGEMENT}/${process.env.CONFIG_MONGO_DB_NAME_DEVICE_MANAGEMENT}`;
        return result;
    }
}