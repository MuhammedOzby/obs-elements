import React, { Component } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Videocam } from "@mui/icons-material";
import OBS from "../lib/obs-interface";

export default class PageRecord extends Component<
  {},
  { programScene: string; screenShot: string }
> {
  private imageFormat: string;
  constructor(props: object) {
    super(props);
    this.imageFormat = "jpg";
    this.state = {
      programScene: "",
      screenShot: "",
    };
  }
  async componentDidMount() {
    setInterval(async () => {
      this.setState({
        ...this.state,
        screenShot: (
          await OBS.call("GetSourceScreenshot", {
            sourceName: (
              await OBS.call("GetCurrentProgramScene")
            ).currentProgramSceneName,
            imageFormat: this.imageFormat,
            imageWidth: 1280,
            imageHeight: 720,
          })
        ).imageData,
      });
    }, 52);
    this.setState({
      ...this.state,
      programScene: (await OBS.call("GetCurrentProgramScene"))
        .currentProgramSceneName,
    });
  }
  render() {
    const controlButtonStyles = { width: "100%", mt: 1 };
    return (
      <Grid
        container
        spacing={2}
        sx={{
          pt: 5,
        }}
      >
        <Grid sm={8} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {this.state.programScene}
              </Typography>
              <CardMedia
                component="img"
                image={this.state.screenShot}
                alt="Preview"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid sm={4} xs={12}>
          <Card>
            <CardContent>
              <Button
                sx={controlButtonStyles}
                variant="contained"
                startIcon={<Videocam />}
              >
                Record
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
