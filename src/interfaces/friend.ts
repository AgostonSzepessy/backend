/**
 * Stores data about friends
 */
export interface FriendData {
    friend_id: number;
    username: string;
    fname: string;
    lname: string;
}

/**
 * Represents a list of friends. Friends can either be confirmed friends or
 * unconfirmed if they haven't accepted the friend request yet.
 */
export interface FriendList {
    confirmed: [FriendData];
    unconfirmed: [FriendData];
}
