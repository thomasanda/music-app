from tkinter import E
from flask import Blueprint, jsonify, request
from . import tidal
import json
import base64


main = Blueprint('main', __name__)

@main.route('/get_artist_albums', methods=['GET'])
def get_artist_albums():
    playlists = tidal.get_playlists_tracks_popularity()
    return jsonify(({'playlists': playlists}))

@main.route('/get_user_playlists', methods=['GET'])
def get_user_playlists():
    playlists = tidal.get_user_playlists()
    return jsonify({'playlists': playlists})

@main.route('/get_favorite_tracks', methods=['GET'])
def get_favorite_tracks():
    tracks = tidal.get_favorite_tracks()
    return jsonify({'track-id': tracks})

@main.route('/search_artist_albums/<artist>', methods=['GET'])
def search_artist_names(artist):
    albums = tidal.get_artist_albums(artist)
    return jsonify({'albums': albums })

@main.route('/search_artist/<artist>', methods=['GET'])
def search_artists(artist):
    artist = tidal.get_artists(artist)
    return jsonify(artist)

@main.route('/get_user_picture', methods=['GET'])
def get_user_picture():
    user = tidal.get_user_picture()
    return user

@main.route('/get_album_tracks/<album_id>', methods=['GET'])
def get_album_tracks(album_id):
    tracks = tidal.get_album_tracks(album_id)
    return jsonify(tracks)

@main.route('/get_playback_info/<track_id>', methods=['GET'])
def get_playback_info(track_id):
    playback_info = tidal.get_playback_info(track_id)
    message = json.loads(playback_info.decode('utf-8'))
    message_bytes = base64.b64decode(message['manifest'])
    decoded = json.loads(message_bytes.decode('ascii'))
    return  jsonify(message, decoded)

@main.route('/add_track_to_favorites/<track_id>', methods=['POST'])
def add_track_to_favorites(track_id):
    tidal.add_track_to_favorites(track_id)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

@main.route('/add_track_to_playlist/<data>', methods=['POST'])
def add_track_to_playlist(data):
    dataObject = json.loads(data)
    print(dataObject['track'])
    tidal.add_tracks_to_playlist(dataObject['track'], dataObject['playlist'])
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 
