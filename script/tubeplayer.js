(function (g) {
	function n(c, a) {
		a = g.extend({}, o, a);
		if (!c.hasClass(i)) {
			c.addClass(i).data(k, a);
			for (e in l) c.bind(e + j, c, l[e]);
			var b = g.tubeplayer.defaults,
				d = a.playerID,
				h = b.onPlayer;
			h.unstarted[d] = a.onPlayerUnstarted;
			h.ended[d] = a.onPlayerEnded;
			h.playing[d] = a.onPlayerPlaying;
			h.paused[d] = a.onPlayerPaused;
			h.buffering[d] = a.onPlayerBuffering;
			h.cued[d] = a.onPlayerCued;
			b.onQualityChange[d] = a.onQualityChange;
			b = b.onErr;
			b.notFound[d] = a.onErrorNotFound;
			b.notEmbeddable[d] = a.onErrorNotEmbeddable;
			m.push(d);
			b = "tubeplayer-player-container-" + m.length;
			jQuery("<div></div>").attr("id", b).appendTo(c);
			swfobject.embedSWF("http://www.youtube.com/v/" + a.initialVideo + "?fs=1&enablejsapi=1&version=3&playerapiid=" + d, b, a.width, a.height, "8", null, null, {
				allowScriptAccess: a.allowScriptAccess,
				wmode: "transparent",
				allowFullScreen: a.allowFullScreen
			}, {
				id: d
			})
		}
	}
	var j = ".tubeplayer",
		i = "-youtube-tubeplayer-",
		k = "opts" + j;
	g.tubeplayer = {};
	g.tubeplayer.defaults = {
		afterReady: function () {},
		stateChange: function (c) {
			var a = this.onPlayer;
			return function (b) {
				switch (b) {
				case -1:
					return a.unstarted[c]();
				case 0:
					return a.ended[c]();
				case 1:
					return a.playing[c]();
				case 2:
					return a.paused[c]();
				case 3:
					return a.buffering[c]();
				case 5:
					return a.cued[c]();
				default:
					return null
				}
			}
		},
		onError: function (c) {
			var a = this.onErr;
			return function (b) {
				switch (b) {
				case 100:
				case 150:
					return a.notFound[c]();
				case 101:
					return a.notEmbeddable[c]();
				default:
					return null
				}
			}
		},
		qualityChange: function (c) {
			var a = this;
			return function (b) {
				return a.onQualityChange[c](b)
			}
		},
		onQualityChange: {},
		onPlayer: {
			unstarted: {},
			ended: {},
			playing: {},
			paused: {},
			buffering: {},
			cued: {}
		},
		onErr: {
			notFound: {},
			notEmbeddable: {}
		}
	};
	var o = {
		allowScriptAccess: "always",
		width: 425,
		height: 355,
		allowFullScreen: "true",
		initialVideo: "DkoeNLuMbcI",
		playerID: "youtube-player",
		preferredQuality: "default",
		onPlay: function () {},
		onPause: function () {},
		onStop: function () {},
		onSeek: function () {},
		onMute: function () {},
		onUnMute: function () {},
		onPlayerUnstarted: function () {},
		onPlayerEnded: function () {},
		onPlayerPlaying: function () {},
		onPlayerPaused: function () {},
		onPlayerBuffering: function () {},
		onPlayerCued: function () {},
		onQualityChange: function () {},
		onErrorNotFound: function () {},
		onErrorNotEmbeddable: function () {}
	};
	g.fn.tubeplayer = function (c, a) {
		var b = g(this),
			d = typeof c;
		if (arguments.length == 0 || d == "object") return n(b, c);
		else if (d == "string") return b.triggerHandler(c + j, a || null)
	};
	var f = function (c) {
		return function (a, b) {
			var d = g.tubeplayer.getPkg(a);
			if (d.ytplayer) {
				a = c(a, b, d);
				if (typeof a == "undefined") a = d.$player;
				return a
			}
			return d.$player
		}
	},
		l = {
			cue: f(function (c, a, b) {
				b.ytplayer.cueVideoById(a, b.opts.preferredQuality)
			}),
			play: f(function (c, a, b) {
				if (typeof a == "object") b.ytplayer.loadVideoById(a.id, a.time, b.opts.preferredQuality);
				else a ? b.ytplayer.loadVideoById(a, 0, b.opts.preferredQuality) : b.ytplayer.playVideo();
				b.opts.onPlay(a)
			}),
			pause: f(function (c, a, b) {
				b.ytplayer.pauseVideo();
				b.opts.onPause()
			}),
			stop: f(function (c, a, b) {
				b.ytplayer.stopVideo();
				b.opts.onStop()
			}),
			seek: f(function (c, a, b) {
				b.ytplayer.seekTo(a, true);
				b.opts.onSeek(a)
			}),
			mute: f(function (c, a, b) {
				b.ytplayer.mute();
				b.opts.onMute()
			}),
			unmute: f(function (c, a, b) {
				b.ytplayer.unMute();
				b.ytplayer.setVolume(100);
				b.opts.onUnMute()
			}),
			isMuted: f(function (c, a, b) {
				return b.ytplayer.isMuted()
			}),
			volume: f(function (c, a, b) {
				if (a) b.ytplayer.setVolume(a);
				else return b.ytplayer.getVolume()
			}),
			quality: f(function (c, a, b) {
				if (a) b.ytplayer.setPlaybackQuality(a);
				else return b.ytplayer.getPlaybackQuality()
			}),
			data: f(function (c, a, b) {
				c = {};
				b = b.ytplayer;
				c.bytesLoaded = b.getVideoBytesLoaded();
				c.bytesTotal = b.getVideoBytesTotal();
				c.startBytes = b.getVideoStartBytes();
				c.state = b.getPlayerState();
				c.currentTime = b.getCurrentTime();
				c.availableQualityLevels = b.getAvailableQualityLevels();
				c.duration = b.getDuration();
				c.videoURL = b.getVideoUrl();
				return c
			}),
			size: f(function (c, a, b) {
				if (a.width && a.height) {
					b.ytplayer.setSize(a.width, a.height);
					g(b.ytplayer).css(a)
				}
			}),
			destroy: f(function (c, a, b) {
				b.$player.removeClass(i).data(k, null).unbind(j);
				g(b.ytplayer).remove();
				return null
			}),
			player: f(function (c, a, b) {
				return b.ytplayer
			})
		};
	g.tubeplayer.getPkg = function (c) {
		c = c.data;
		var a = c.data(k);
		return {
			$player: c,
			opts: a,
			ytplayer: a ? document.getElementById(a.playerID) : null
		}
	};
	var m = [];
	onYouTubePlayerReady = function (c) {
		var a =
		document.getElementById(c);
		a.addEventListener("onStateChange", "$.tubeplayer.defaults.stateChange('" + c + "')");
		a.addEventListener("onError", "$.tubeplayer.defaults.onError('" + c + "')");
		a.addEventListener("onPlaybackQualityChange", "$.tubeplayer.defaults.qualityChange('" + c + "')");
		c = g(a).parents("." + i);
		g.tubeplayer.defaults.afterReady(c)
	}
})(jQuery);
