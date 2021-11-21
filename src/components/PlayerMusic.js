import Switch from 'rc-switch'
import React from 'react'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import './PlayerMusic.scss'

const audioList1 = [
  {
    name: 'Despacito',
    singer: 'Luis Fonsi',
    cover:
      'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
    musicSrc:
      'http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3',

  },
 
]

const options = {
  audioLists: audioList1,

  defaultPlayIndex: 0,

  
  theme: 'auto',

 
  bounds: 'body',

  quietUpdate: false,

  
  clearPriorAudioLists: false,


  autoPlayInitLoadPlayList: false,

  preload: false,

  
  glassBg: false,

  
  remember: false,

  
  remove: true,

 
  defaultPosition: {
    right: 100,
    bottom: 120,
  },

  
  defaultPlayMode: 'order',

  
  mode: 'full',

 
  once: false,

  
  autoPlay: false,

  
  toggleMode: true,

  
  showMiniModeCover: true,


  showMiniProcessBar: false,

  drag: true,


  seeked: true,


  showMediaSession: true,


  showProgressLoadBar: true,
  showPlay: true,
  showReload: true,
  showDownload: true,
  showPlayMode: true,
  showThemeSwitch: true,
  showLyric: true,
  extendsContent: null,
  defaultVolume: 1,
  playModeShowTime: 600,

  loadAudioErrorPlayNext: true,

  autoHiddenCover: false,

  spaceBar: true,

  

  responsive: true,

  
  mobileMediaQuery: '(max-width: 1024px)',

  
  volumeFade: {
    fadeIn: 1000,
    fadeOut: 1000,
  },

  restartCurrentOnPrev: false,

  
  sortableOptions: {},


  onAudioDownload(audioInfo) {
    console.log('audio download', audioInfo)
  },


  onAudioPlay(audioInfo) {
    console.log('audio playing', audioInfo)
  },


  onAudioPause(audioInfo) {
    console.log('audio pause', audioInfo)
  },

 
  onAudioSeeked(audioInfo) {
    console.log('audio seeked', audioInfo)
  },

  
  onAudioVolumeChange(currentVolume) {
    console.log('audio volume change', currentVolume)
  },


  onAudioEnded(currentPlayId, audioLists, audioInfo) {
    console.log('audio ended', currentPlayId, audioLists, audioInfo)
  },


  onAudioAbort(currentPlayId, audioLists, audioInfo) {
    console.log('audio abort', currentPlayId, audioLists, audioInfo)
  },




  // audio reload handle
  onAudioReload(audioInfo) {
    console.log('audio reload:', audioInfo)
  },

  // audio load failed error handle
  onAudioError(errMsg, currentPlayId, audioLists, audioInfo) {
    console.error('audio error', errMsg, currentPlayId, audioLists, audioInfo)
  },

  // theme change handle
  // onThemeChange(theme) {
  //   console.log('theme change:', theme)
  // },

  onAudioListsChange(currentPlayId, audioLists, audioInfo) {
    console.log('audio lists change:', currentPlayId, audioLists, audioInfo)
  },

  onAudioPlayTrackChange(currentPlayId, audioLists, audioInfo) {
    console.log(
      'audio play track change:',
      currentPlayId,
      audioLists,
      audioInfo,
    )
  },

  // onPlayModeChange(playMode) {
  //   console.log('play mode change:', playMode)
  // },

  // onModeChange(mode) {
  //   console.log('mode change:', mode)
  // },

  onAudioListsPanelChange(panelVisible) {
    console.log('audio lists panel visible:', panelVisible)
  },

  onAudioListsSortEnd(oldIndex, newIndex) {
    console.log('audio lists sort end:', oldIndex, newIndex)
  },

  onAudioLyricChange(lineNum, currentLyric) {
    console.log('audio lyric change:', lineNum, currentLyric)
  },

  // custom music player root node
  getContainer() {
    return document.body
  },

  /**
   * @description get origin audio element instance , you can use it do everything
   * @example
   * audio.playbackRate = 1.5  // set play back rate
   * audio.crossOrigin = 'xxx' // config cross origin
   */
  getAudioInstance(audio) {
    console.log('audio instance', audio)
  },

  onBeforeDestroy(currentPlayId, audioLists, audioInfo) {
    console.log('onBeforeDestroy currentPlayId: ', currentPlayId)
    console.log('onBeforeDestroy audioLists: ', audioLists)
    console.log('onBeforeDestroy audioInfo: ', audioInfo)
    return new Promise((resolve, reject) => {
      // your custom validate
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you confirm destroy the player?')) {
        // if resolve, player destroyed
        resolve()
      } else {
        // if reject, skip.
        reject()
      }
    })
  },

  onDestroyed(currentPlayId, audioLists, audioInfo) {
    console.log('onDestroyed:', currentPlayId, audioLists, audioInfo)
  },

  onCoverClick(mode, audioLists, audioInfo) {
    console.log('onCoverClick: ', mode, audioLists, audioInfo)
  },

 

  /**
   * @return
   

  /**

   * @param {*} downloadInfo
   * @example
   *
   
   */

}

class PlayerMusic extends React.PureComponent {
  constructor(props) {
    super(props)
    this.audio = {}
  }

  state = {
    unmount: false,
    params: {
      ...options,
      getAudioInstance: (audio) => {
        this.audio = audio
      },
    },
  }

  onAddAudio = () => {
    this.updateParams({
      clearPriorAudioLists: false,
      audioLists: [
        ...this.state.params.audioLists,
        {
          name: "I'm new here",
          singer: 'jack',
          cover: 'http://www.lijinke.cn/music/1387583682387727.jpg',
          musicSrc: `http://www.lijinke.cn/music.mp3`,
        },
      ],
    })
  }

  extendsContent = () => {
    this.updateParams({
      extendsContent: (
        <button
          type="button"
          onClick={() => {
        
            alert("I'm extends content")
          }}
        >
          button
        </button>
      ),
    })
  }

  onChangeToFirstAudioList = () => {
    this.updateParams({
      clearPriorAudioLists: true,
      quietUpdate: false,
      audioLists: audioList1,
    })
  }



  onAutoPlayMode = () => {
    this.updateParams({
      autoPlay: !this.state.params.autoPlay,
    })
  }

  onAutoPlayInitLoadPlayList = () => {
    this.updateParams({
      autoPlayInitLoadPlayList: !this.state.params.autoPlayInitLoadPlayList,
    })
  }

  onClearPriorAudioLists = () => {
    this.updateParams({
      clearPriorAudioLists: !this.state.params.clearPriorAudioLists,
    })
  }

  onShowGlassBg = () => {
    this.onChangeKey('glassBg')
  }

  onDrag = () => {
    this.onChangeKey('drag')
  }

  onToggleMode = () => {
    this.onChangeKey('toggleMode')
  }

  onSeeked = () => {
    this.onChangeKey('seeked')
  }

  onChangeKey = (key) => {
    const data = {
      ...this.state.params,
      [key]: !this.state.params[key],
    }
    if (key === 'light' || key === 'dark') {
      data.theme = key
    }
    if (key === 'full' || key === 'mini') {
      data.mode = key
    }
}


  showMiniProcessBar = () => {
    this.onChangeKey('showMiniProcessBar')
  }

  showMiniModeCover = () => {
    this.onChangeKey('showMiniModeCover')
  }

  updateParams = (params) => {
    const data = {
      ...this.state.params,
      ...params,
    }
    this.setState({
      params: data,
    })
  }

  unmountPlayer = () => {
    this.setState({ unmount: true })
  }

  onPlayModeChange = (e) => {
    this.updateParams({ playMode: e.target.value })
  }

  renderCustomAudioTitle = () => {
    this.updateParams({
      renderAudioTitle: (audioInfo, isMobile) => {
        return (
          <>
            <a href="#">{audioInfo.name}</a>
            <span className="tag">Hot</span>
          </>
        )
      },
    })
  }

  renderCustomUI = () => {
    return (
      < div className ="playerMusic">
        <h2>Custom UI</h2>
        <button type="button" onClick={() => this.audio.play()}>
          play
        </button>
        <button type="button" onClick={() => this.audio.pause()}>
          pause
        </button>
        <button type="button" onClick={() => this.audio.load()}>
          reload
        </button>
        <button
          type="button"
          onClick={() => {
            this.audio.currentTime = 40
          }}
        >
          change current play time to 00:40
        </button>
        <button
          type="button"
          onClick={() => {
            this.audio.playbackRate = 2
          }}
        >
          change play back rate to 2
        </button>
        <button
          type="button"
          onClick={() => {
            this.audio.volume = 0.2
          }}
        >
          change volume to 0.2
        </button>
        <button type="button" onClick={this.audio.togglePlay}>
          toggle play
        </button>
        <button type="button" onClick={this.audio.clear}>
          clear audio lists
        </button>
        <button type="button" onClick={this.audio.playNext}>
          play next
        </button>
        <button type="button" onClick={this.audio.playPrev}>
          play prev
        </button>
        <button
          type="button"
          onClick={() => {
            this.audio.playByIndex(1)
          }}
        >
          play by index (1)
        </button>
        <button
          type="button"
          onClick={() => {
            this.audio.updatePlayIndex(1)
          }}
        >
          update play index (1)
        </button>
      </div>
    )
  }

  render() {
    const { params, unmount } = this.state
    return (
      <>
      
        <section className="settings">
          <button type="button" onClick={this.onChangeToFirstAudioList}>
            change to first audio list ({audioList1.length})
          </button> 
          <button type="button" onClick={this.onAddAudio}>
            + add audio ({params.audioLists.length})
          </button>
          <button type="button" onClick={this.extendsContent}>
            + add extends content
          </button>
          <button type="button" onClick={this.playModeShowTime}>
            change play mode show time ({params.playModeShowTime} ms)
          </button>
          <button type="button" onClick={this.changePlayIndex}>
            change playIndex ({params.playIndex || 0})
          </button>
          <button type="button" onClick={this.unmountPlayer}>
            unmount player
          </button>
          <button type="button" onClick={this.renderCustomAudioTitle}>
            render custom audio title
          </button>
          <br />
          <br />
          <label htmlFor="glassBg">
            <input type="checkbox" id="glassBg" onChange={this.onShowGlassBg} />
            glassBg
          </label>
          <label htmlFor="drag">
            <input
              type="checkbox"
              id="drag"
              checked={params.drag}
              onChange={this.onDrag}
            />
            drag
          </label>
          <label htmlFor="seeked">
            <input
              type="checkbox"
              id="seeked"
              checked={params.seeked}
              onChange={this.onSeeked}
            />
            seeked
          </label>
          <label htmlFor="toggle">
            <input
              type="checkbox"
              id="toggle"
              checked={params.toggleMode}
              onChange={this.onToggleMode}
            />
            toggleMode
          </label>
          <label htmlFor="autoPlay">
            <input
              type="checkbox"
              id="autoPlay"
              checked={params.autoPlay}
              onChange={this.onAutoPlayMode}
            />
            autoPlay
          </label>
          <label htmlFor="clearPriorAudioLists">
            <input
              type="checkbox"
              id="clearPriorAudioLists"
              checked={params.clearPriorAudioLists}
              onChange={this.onClearPriorAudioLists}
            />
            clearPriorAudioLists
          </label>
          <label htmlFor="onAutoPlayInitLoadPlayList">
            <input
              type="checkbox"
              id="onAutoPlayInitLoadPlayList"
              checked={params.autoPlayInitLoadPlayList}
              onChange={this.onAutoPlayInitLoadPlayList}
            />
            autoplayInitLoadPlayList
          </label>
          <label htmlFor="showMiniProcessBar">
            <input
              type="checkbox"
              id="showMiniProcessBar"
              checked={params.showMiniProcessBar}
              onChange={this.showMiniProcessBar}
            />
            showMiniProcessBar
          </label>
          <label htmlFor="showMiniModeCover">
            <input
              type="checkbox"
              id="showMiniModeCover"
              checked={params.showMiniModeCover}
              onChange={this.showMiniModeCover}
            />
            showMiniModeCover
          </label>
          <label htmlFor="showProgressLoadBar">
            <input
              type="checkbox"
              id="showProgressLoadBar"
              checked={params.showProgressLoadBar}
              onChange={() => this.onChangeKey('showProgressLoadBar')}
            />
            showProgressLoadBar
          </label>
          <label htmlFor="showPlay">
            <input
              type="checkbox"
              id="showPlay"
              checked={params.showPlay}
              onChange={() => this.onChangeKey('showPlay')}
            />
            showPlay
          </label>
          <label htmlFor="showReload">
            <input
              type="checkbox"
              id="showReload"
              checked={params.showReload}
              onChange={() => this.onChangeKey('showReload')}
            />
            showReload
          </label>
          <label htmlFor="showDownload">
            <input
              type="checkbox"
              id="showDownload"
              checked={params.showDownload}
              onChange={() => this.onChangeKey('showDownload')}
            />
            showDownload
          </label>
          <label htmlFor="showPlayMode">
            <input
              type="checkbox"
              id="showPlayMode"
              checked={params.showPlayMode}
              onChange={() => this.onChangeKey('showPlayMode')}
            />
            showPlayMode
          </label>
          <label htmlFor="showThemeSwitch">
            <input
              type="checkbox"
              id="showThemeSwitch"
              checked={params.showThemeSwitch}
              onChange={() => this.onChangeKey('showThemeSwitch')}
            />
            showThemeSwitch
          </label>
          <label htmlFor="showLyric">
            <input
              type="checkbox"
              id="showLyric"
              checked={params.showLyric}
              onChange={() => this.onChangeKey('showLyric')}
            />
            showLyric
          </label>
          <label htmlFor="showDestroy">
            <input
              type="checkbox"
              id="showDestroy"
              checked={params.showDestroy}
              onChange={() => this.onChangeKey('showDestroy')}
            />
            showDestroy
          </label>
          <label htmlFor="preload">
            <input
              type="checkbox"
              id="preload"
              checked={params.preload}
              onChange={() => this.onChangeKey('preload')}
            />
            preload
          </label>
          <label htmlFor="remove">
            <input
              type="checkbox"
              id="remove"
              checked={params.remove}
              onChange={() => this.onChangeKey('remove')}
            />
            remove
          </label>
          <label htmlFor="remember">
            <input
              type="checkbox"
              id="remember"
              checked={params.remember}
              onChange={() => this.onChangeKey('remember')}
            />
            remember
          </label>
          <label htmlFor="spaceBar">
            <input
              type="checkbox"
              id="spaceBar"
              checked={params.spaceBar}
              onChange={() => this.onChangeKey('spaceBar')}
            />
            spaceBar
          </label>
          <label htmlFor="responsive">
            <input
              type="checkbox"
              id="responsive"
              checked={params.responsive}
              onChange={() => this.onChangeKey('responsive')}
            />
            responsive
          </label>
          <label htmlFor="autoHiddenCover">
            <input
              type="checkbox"
              id="autoHiddenCover"
              checked={params.autoHiddenCover}
              onChange={() => this.onChangeKey('autoHiddenCover')}
            />
            autoHiddenCover
          </label>
          <label htmlFor="quietUpdate">
            <input
              type="checkbox"
              id="quietUpdate"
              checked={params.quietUpdate}
              onChange={() => this.onChangeKey('quietUpdate')}
            />
            quietUpdate
          </label>
          <label htmlFor="restartCurrentOnPrev">
            <input
              type="checkbox"
              id="restartCurrentOnPrev"
              checked={params.restartCurrentOnPrev}
              onChange={() => this.onChangeKey('restartCurrentOnPrev')}
            />
            restartCurrentOnPrev
          </label>
          <div className="toggle">
            theme :{params.theme}
            <Switch
              checkedChildren="D"
              unCheckedChildren="L"
              checked={params.theme === 'light'}
              onChange={(checked) =>
                this.onChangeKey(checked ? 'light' : 'dark')
              }
            />
            mode :{params.mode}
            <Switch
              checkedChildren="M"
              unCheckedChildren="F"
              checked={params.mode === 'mini'}
              onChange={(checked) =>
                this.onChangeKey(checked ? 'mini' : 'full')
              }
            />
            language :
            <Switch
              checkedChildren="zh"
              unCheckedChildren="en"
              onChange={(checked) =>
                this.onChangeKey()
              }
            />
          </div>
          <div>{this.renderCustomUI()}</div>
        </section>
        {unmount ? null : (
          <ReactJkMusicPlayer
            {...params}
            onThemeChange={(theme) => {
              console.log('onThemeChange: ', theme)
              this.updateParams({ theme })
            }}
            onModeChange={(mode) => {
              console.log('onModeChange: ', mode)
              this.updateParams({ mode })
            }}
            onPlayModeChange={(playMode) => {
              console.log('onPlayModeChange: ', playMode)
              this.updateParams({ playMode })
            }}
            onPlayIndexChange={(playIndex) => {
              console.log('onPlayIndexChange: ', playIndex)
              this.updateParams({ playIndex })
            }}
          />
        )}
      </>
    )
  }
}

export default PlayerMusic ;