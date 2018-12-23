import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import gpx from 'gpx-for-runners';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoic3RvcnJlbGxhcyIsImEiOiJjaWp6bHQ5Y3kwMDU4dmNtMHgzb2NhNmU5In0.M3jJSPh7KUT0QDSd7Bn3Rg"
});


const drawerWidth = 240;

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  mapContainer: {
    height: 320,
    width: 220,
  },
  input: {
  display: 'none',
  }
});

class MapUnoceros extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fitBounds: undefined,
      center: [-0.481747846041145, 51.3233379650232],
      zoom: [10],
      station: undefined,
      stations: {}
    };
  }

  handleOnReadEnd(){
    const content = fileReader.result;
    console.log(content)
  }

  handleInputFile(event){
    const file = event.target.files[0]

    let fileReader = new FileReader()
    fileReader.onloadend = function(){
        const content = fileReader.result;
        console.log("-- File Content --")
        console.log(content);
        // … do something with the 'content' …
        const gpx = new gpx( content );
        console.log(gpx.trackpoints)
    }
    fileReader.readAsText(event.target.files[0])
  }

  render() {
    const { classes } = this.props;

    const position = []
    const { fitBounds, center, zoom, stations, station } = this.state;

    const mappedRoute = [
      [-0.481747846041145, 51.3233379650232],
      [-0.472757846041245, 51.3233379650232],
      [-0.463767846041345, 51.3233379650232],
      [-0.454777846041445, 51.3233379650232]
    ]

    const lineLayout = {
      'line-cap': 'round',
      'line-join': 'round'
    };

    const linePaint = {
      'line-color': '#4790E5',
      'line-width': 12
    };


    return (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            GFX Reader
          </Typography>
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            zoom={zoom}
            center={mappedRoute[0]}
            containerStyle={{
              height: "400px",
              width: "800px"
            }}>
              <Layer type="line" layout={lineLayout} paint={linePaint}>
              <Feature coordinates={mappedRoute} />
            </Layer>
          </Map>

          <input
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={this.handleInputFile.bind(this)}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" className={classes.button}>
              Upload
            </Button>
          </label>
        </main>
    );
  }
}

export default withStyles(styles)(MapUnoceros);
