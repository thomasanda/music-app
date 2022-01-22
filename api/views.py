from flask import Blueprint, jsonify, request
from . import tidal

main = Blueprint('main', __name__)

@main.route('/get_artist_albums', methods=['GET'])
def get_artist_albums():
    # artist_data = request.get_json()

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
