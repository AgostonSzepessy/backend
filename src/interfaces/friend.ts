export interface FriendData {
    friend_id: number;
    username: string;
    fname: string;
    lname: string;
}

export interface FriendList {
    confirmed: [FriendData];
    unconfirmed: [FriendData];
}
