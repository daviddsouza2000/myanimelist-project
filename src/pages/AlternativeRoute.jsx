import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AlternativeRoute({ Component, Component2, ...rest }) {
    const { currentUsername } = useAuth();
    const { username } = useParams();

    return currentUsername === username ? <Component /> : <Component2 />
}