import React, { Component } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Videocam } from "@mui/icons-material";
import OBS from "../lib/obs-interface";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/store";

type SceneListReferance = { sceneName: string; sceneIndex: string };

const mapState = (state: RootState) => ({ ...state.obsConnection });

const reduxConnector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof reduxConnector>;

class PageRecord extends Component<
  PropsFromRedux,
  {
    programScene: string;
    screenShot: string;
    sceneList: Array<SceneListReferance>;
  }
> {
  private imageFormat: string;
  constructor(props: any) {
    super(props);
    this.imageFormat = "jpg";
    this.state = {
      sceneList: [],
      programScene: "",
      screenShot: "",
    };
  }
  async componentDidMount() {
    setInterval(async () => {
      if (this.props.connectionStatus) {
        this.setState({
          ...this.state,
          sceneList: (await OBS.call("GetSceneList"))
            .scenes as Array<SceneListReferance>,
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
          programScene: (await OBS.call("GetCurrentProgramScene"))
            .currentProgramSceneName,
        });
      }
    }, 130);
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
            <List>
              {this.state.sceneList.reverse().map((element) => (
                <ListItem disablePadding key={element.sceneIndex}>
                  <ListItemButton
                    onClick={() =>
                      OBS.call("SetCurrentProgramScene", {
                        sceneName: element.sceneName,
                      })
                    }
                    selected={element.sceneName == this.state.programScene}
                  >
                    <ListItemText primary={element.sceneName} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
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

export default reduxConnector(PageRecord);
