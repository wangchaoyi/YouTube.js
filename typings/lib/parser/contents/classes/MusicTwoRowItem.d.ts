export = MusicTwoRowItem;
declare class MusicTwoRowItem {
    constructor(data: any);
    type: string;
    title: Text;
    endpoint: NavigationEndpoint;
    id: any;
    subtitle: Text;
    badges: any;
    subscribers: any;
    item_count: number;
    artists: any;
    year: any;
    views: any;
    author: {
        name: any;
        channel_id: any;
        endpoint: any;
    };
    thumbnail: Thumbnail[];
    thumbnail_overlay: any;
    menu: any;
}
import Text = require("./Text");
import NavigationEndpoint = require("./NavigationEndpoint");
import Thumbnail = require("./Thumbnail");
