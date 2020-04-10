import React, { Component } from "react";

export default () => {
    return (
        <homepageHeader className="lead mt-5 p-4 text-center">
            <p className="text-center"><strong>This is a lookup for monsters in dnd 5e. Enter the monster you would like to get the stats for. If you would like you could also add the monster to your favorites with the provided button.</strong></p>
            <p className="text-center">Example monsters: Kobold, Aboleth, Adult Black Dragon</p>
        </homepageHeader>
    );
};