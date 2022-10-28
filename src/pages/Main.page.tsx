import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Container,
} from "@mui/material";
import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar.component";

export default class PageMain extends Component {
  render() {
    return (
      <>
        <Container fixed>
          <Outlet />
        </Container>
        <BottomNavbar />
      </>
    );
  }
}
