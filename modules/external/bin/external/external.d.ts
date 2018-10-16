
declare class ext {
    static getServerListUrl(): string;
    static getGamePre(): string;
    static getIsDebug(): boolean;
    static getPlatform(): string;
    static getIsShowAdv(): boolean;
    static getRankUrl(): string;
    static getResourceUrl(): string;
    static xmlHttpRequest(url, callback, cache);
    static loadServerConfig(callback);
}
