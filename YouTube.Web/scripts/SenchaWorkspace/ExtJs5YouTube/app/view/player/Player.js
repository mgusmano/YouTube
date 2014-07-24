Ext.define("ExtJs5YouTube.view.player.Player", {
    extend: 'Ext.panel.Panel',
    xtype: 'player',
    layout: 'fit',
    config: {
        player: null,
        videoId: null,
        title: null,
        description: null,
        url: null,
        publishedAt: null,
        tooltip: null
    },

    listeners: {
        afterlayout: function (panel, layout, eOpts) {
            this.doAfterLayout(panel, layout, eOpts)
        },
        activate: function (panel, eOpts) {
            ExtJs5YouTube.view.player.Player.me = this;
        }
    },

    statics: {
        YouTubeInitialized: false,
        YouTubeIframeAPIReady: false,
        me: null
    },

    play: function () {
        this.down('#playerPlayButton').setDisabled(true);
        this.down('#playerStopButton').setDisabled(false);
        this.player.playVideo();
    },

    stop: function () {
        this.down('#playerPlayButton').setDisabled(false);
        this.down('#playerStopButton').setDisabled(true);
        try {
            this.player.stopVideo();
        }
        catch(err) {}
    },

    constructor: function (config) {
        this.callParent(arguments);
        this.initConfig(config);
        if (ExtJs5YouTube.view.player.Player.YouTubeInitialized === false) {
            ExtJs5YouTube.view.player.Player.YouTubeInitialized = true;
            window.onYouTubeIframeAPIReady = function () {
                ExtJs5YouTube.view.player.Player.YouTubeIframeAPIReady = true;
            };
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    },

    createPlayer: function (me) {
        //ExtJs5YouTube.view.player.Player.me = me;
        me.firstTime = false;
        var element = document.createElement('div');
        element.id = me.id + '-player';
        var theParent = document.getElementById(me.id + '-body');
        theParent.appendChild(element);
        document.getElementById(element.id).style.width = '100%';
        document.getElementById(element.id).style.height = '100%';
        me.setPlayer(new YT.Player(me.id + '-player', {
            videoId: me.videoId,
            playerVars: {
                autohide: 0,
                autoplay: 0,
                //cc_load_policy: 1,
                color: 'white',
                controls: 0, //0-do not display, 2-display
                disablekb: 0,
                enablejsapi: 0,
                //end: 0,
                fs: 0,
                iv_load_policy: 3,
                //list: 0,
                //listType: 0,
                loop: 0,
                modestbranding: 0,
                //origin: 0,
                //playerapiid: 0,
                //playlist: 0,
                playsinline: 0,
                rel: 0,
                showinfo: 0,
                start: 0,
                theme: 'light'
            },
            events: {
                'onReady': me.onPlayerReady,
                'onStateChange': me.onPlayerStateChange
                //onPlaybackQualityChange
                //onPlaybackRateChange
                //onError
                //onApiChange
            }
        }));
    },

    onPlayerReady: function (event) {
        var me = ExtJs5YouTube.view.player.Player.me;
        me.down('#playerPlayButton').setDisabled(false);
    },

    onPlayerStateChange: function (event) {
        var me = ExtJs5YouTube.view.player.Player.me;

        if (event.data == YT.PlayerState.PLAYING) {
            me.down('#playerPlayButton').setDisabled(true);
            me.down('#playerStopButton').setDisabled(false);
        }

        if (event.data == YT.PlayerState.PAUSED) {
            me.down('#playerPlayButton').setDisabled(false);
            me.down('#playerStopButton').setDisabled(true);
        }

        //This event fires whenever the player's state changes. The data property of the event object that the API passes to your event listener function will specify an integer that corresponds to the new player state. Possible values are:
        //-1 (unstarted)
        //0 (ended)
        //1 (playing)
        //2 (paused)
        //3 (buffering)
        //5 (video cued).
        //When the player first loads a video, it will broadcast an unstarted (-1) event. When a video is cued and ready to play, the player will broadcast a video cued (5) event. In your code, you can specify the integer values or you can use one of the following namespaced variables:
        //YT.PlayerState.ENDED
        //YT.PlayerState.PLAYING
        //YT.PlayerState.PAUSED
        //YT.PlayerState.BUFFERING
        //YT.PlayerState.CUED


    },

    firstTime: true,
    doAfterLayout: function (panel, layout, eOpts) {
        me = this;
        if (me.firstTime === false) {
            return;
        };
        if (ExtJs5YouTube.view.player.Player.YouTubeIframeAPIReady === true) {
            me.createPlayer(me);
            return true;
        };

        var stop = false;
        var count = 0;
        var task = {
            run: function () {
                if (ExtJs5YouTube.view.player.Player.YouTubeIframeAPIReady === true) {
                    runner.stop(task); 
                    me.createPlayer(me);
                }
                else {
                    count++;
                    if (count > 5) {
                        alert('can not continue');
                        runner.stop(task);
                    }
                }
            },
            interval: 500 
        };
        var runner = new Ext.util.TaskRunner();
        runner.start(task);
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    text: 'Play', itemId: 'playerPlayButton', width: '100px', disabled: true, scope: this, handler: function (button, event) {
                        var thePanel = button.up('panel');
                        thePanel.play();
                    }
                },
                {
                    text: 'Stop', itemId: 'playerStopButton', width: '100px', disabled: true, handler: function (button, event) {
                        var thePanel = button.up('panel');
                        thePanel.stop();
                    }
                }
            ]
        }
    ]

});
