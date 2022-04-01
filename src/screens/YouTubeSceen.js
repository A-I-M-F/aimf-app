import React, {Component} from 'react';
import {
  ScrollView,
  PixelRatio,
  Dimensions,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import YouTube from 'react-native-youtube';

import {Button, Thumbnail} from 'native-base';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from '../css/YouTubeScreen.css.js';
import {
  getLiveVideo,
  refreshLiveVideoInfo,
  stopLiveVideo,
} from '../store/reducers/liveVideoRedux';
import Loader from '../Components/Loader';
import {LIVE_VIDEO_STR} from '../Utils/Constants';
import InformationModal from '../Components/InformationModal';
import NoVideoIcon from '../Components/icons/placeholders/NoVideoIcon';
import Template from '../css/Template.css';
import LiveBroadcastIcon from '../Components/icons/navbar/LiveBroadcastIcon';
import {isAdmin, isSuperAdmin} from '../Utils/Account';

class YouTubeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  youTubeRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      playerWidth: Dimensions.get('window').width,
      showInfoModal: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.getLiveVideo();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  renderVideoContainer(logo) {
    return (
      <ScrollView style={styles.container}>
        <YouTube
          resumePlayAndroid={false}
          ref={this.youTubeRef}
          apiKey="apiKey"
          videoId={this.props.video.youtube_id}
          play
          loop={false}
          fullscreen={false}
          controls={1}
          style={[
            {
              height: PixelRatio.roundToNearestPixel(
                this.state.playerWidth / (16 / 9),
              ),
            },
            styles.player,
          ]}
        />
        <View
          style={{
            margin: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '80%'}}>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>
              {this.props?.video?.title}
            </Text>
          </View>
          <View style={{marginLeft: 10}}>
            <Thumbnail source={logo} />
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>Tamejida 47</Text>
          </View>
        </View>
        <View
          style={{
            margin: 25,
          }}>
          <Text style={{fontSize: 16}}>{this.props?.video?.description}</Text>
        </View>
      </ScrollView>
    );
  }

  renderVideoSimpleContainer() {
    return (
      <ScrollView style={styles.container}>
        <Text
          style={{
            ...Template.pageTitle,
            alignSelf: 'flex-start',
            marginLeft: 10,
            marginBottom: 5,
          }}>
          Diffusion en cours
        </Text>
        <YouTube
          resumePlayAndroid={false}
          ref={this.youTubeRef}
          apiKey="apiKey"
          videoId={this.props.video.youtube_id}
          play={false}
          loop={false}
          fullscreen={false}
          controls={1}
          style={[
            {
              height: PixelRatio.roundToNearestPixel(
                this.state.playerWidth / (16 / 9),
              ),
            },
            styles.player,
          ]}
        />
        <View
          style={{
            marginLeft: 25,
            marginTop: 10,
          }}>
          <Text style={styles.dateTitleText}>
            {new Date().toLocaleDateString('fr-FR')}
          </Text>
        </View>
        <View
          style={{
            margin: 25,
            marginTop: 7,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '98%'}}>
            <Text style={styles.videoTitle}>{this.props?.video?.title}</Text>
          </View>
        </View>
        <View
          style={{
            margin: 25,
          }}>
          <Text style={styles.videoDesc}>{this.props?.video?.description}</Text>
        </View>
      </ScrollView>
    );
  }

  renderAdminButton() {
    return (
      <SafeAreaView style={styles.topHeader}>
        <Button
          onPress={() => {
            if (!this.props.isLive || this.props.video?.broadcast !== 'live') {
              this.props.refreshLiveVideoInfo();
              this.updateVideoInfoForAdmin();
            }
            this.setState({
              showInfoModal: true,
            });
          }}
          style={styles.topHeaderBtn}>
          <LiveBroadcastIcon size={23} />
          <Text style={styles.navigationText}>
            {this.props.isLive &&
            this.props.video?.isLive &&
            this.props.video?.broadcast === 'live'
              ? LIVE_VIDEO_STR.end_live_btn_message
              : LIVE_VIDEO_STR.start_live_btn_message}
          </Text>
        </Button>
      </SafeAreaView>
    );
  }

  renderNoLivePlaceholder(logo) {
    return (
      <View
        style={{
          ...styles.noneLiveContainer,
          opacity: this.props.loading ? 0.6 : 1,
        }}>
        {!this.props.loading && (
          <>
            <NoVideoIcon size={45} />
            <Text
              style={{
                ...Template.pageTitle,
                marginTop: 30,
                marginLeft: 30,
                marginRight: 20,
                textAlign: 'center',
              }}>
              Il y a pas de diffusion en cours
            </Text>
          </>
        )}
        <Loader visible={!!this.props.loading} />
      </View>
    );
  }

  updateVideoInfoForAdmin() {
    this.props.getLiveVideo();
  }

  renderStartLiveModal() {
    const visible =
      (!this.props.video?.isLive || this.props.video?.broadcast !== 'live') &&
      this.state.showInfoModal;

    return (
      <InformationModal
        visible={visible}
        onHide={() =>
          this.setState({
            showInfoModal: false,
          })
        }
        title={LIVE_VIDEO_STR.starting_live_btn_message}>
        <View>
          <Text>{this.props.liveStartedMessage}</Text>
        </View>
      </InformationModal>
    );
  }

  renderCloseLiveModal() {
    const visible =
      this.props.video?.isLive &&
      this.props.video?.broadcast === 'live' &&
      this.state.showInfoModal;

    return (
      <InformationModal
        visible={visible}
        onHide={() =>
          this.setState({
            showInfoModal: false,
          })
        }
        onConfirm={() => {
          this.props.stopLiveVideo();
          this.updateVideoInfoForAdmin();
        }}
        title={LIVE_VIDEO_STR.ending_live_btn_message}>
        <View>
          <Text>{LIVE_VIDEO_STR.close_live_confirmation_message}</Text>
        </View>
      </InformationModal>
    );
  }

  render() {
    const logo = require('../../assets/images/tamejida_47.jpg');
    return (
      <>
        {(isSuperAdmin(this.props.user) || isAdmin(this.props.user)) &&
          this.renderAdminButton()}
        {!this.props.loading &&
        this.props?.video?.youtube_id &&
        this.props?.video?.isLive
          ? this.renderVideoSimpleContainer(logo)
          : this.renderNoLivePlaceholder(logo)}
        {this.renderStartLiveModal()}
        {this.renderCloseLiveModal()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {video, loading, isLive, liveStartedMessage} = state.liveVideoStore;

  const {user} = state.accountStore;
  return {
    video,
    loading,
    isLive,
    liveStartedMessage,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLiveVideo: () => dispatch(getLiveVideo()),
    refreshLiveVideoInfo: () => dispatch(refreshLiveVideoInfo()),
    stopLiveVideo: () => dispatch(stopLiveVideo()),
  };
};

YouTubeScreen.propTypes = {
  video: PropTypes.object,
  getLiveVideo: PropTypes.func,
  loading: PropTypes.bool,
  isLive: PropTypes.bool,
  liveStartedMessage: PropTypes.string,
  user: PropTypes.object,
  navigation: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(YouTubeScreen);
