
import tidalapi
import json


session = tidalapi.Session()

try:
    config = json.load(open('oauth_file.json'))
    session_id = config['session_id']['data']
    token_type = config['token_type']['data']
    access_token = config['access_token']['data']
    refresh_token = config['refresh_token']['data']
    session.load_oauth_session(session_id, token_type, access_token, refresh_token)
except:
    session.login_oauth_simple()
    if session.check_login():
        data = {}
        data['token_type'] = {'data': session.token_type}
        data['session_id'] = {'data': session.session_id}
        data['access_token'] = {'data': session.access_token}
        data['refresh_token'] = {'data': session.refresh_token}
        with open('oauth_file.json', 'w') as outfile:
            json.dump(data, outfile)
            print('Auth written to file')
    else:
        print('failed authorization')

user_id = session.user.id
favorites = tidalapi.Favorites(session, user_id)

def get_artist_albums(artist_id):
    albums = session.get_artist_albums(artist_id)
    result = []
    for album in albums:
        if not any(d['name'] == album.name for d in result):
            result.append({'name': album.name, 'picture': album.picture(320,320), 'id': album.id})
    return result

def get_artists(artist_name):
    artists = session.search('artist', artist_name, 10)
    result = []
    for artist in artists.artists:
        result.append({'name': artist.name, 'id': artist.id})
    return result

def get_album_tracks(album_id):
    tracks = session.get_album_tracks(album_id)
    result = []
    for track in tracks:
        result.append({
            'name': track.name,
            'popularity': track.popularity,
            'duration': track.duration,
            'track_number': track.track_num,
            "id": track.id,
            'artist': track.artist.name,
        })
    return result


def get_album_tracks_by_artist(artist):
    albums = get_artist_albums(artist)
    tracks = [session.get_album_tracks(album) for album in albums]
    album_result = []
    for album in albums:
        album_result.append(session.get_album(album).name)
    track_result = []
    for track in tracks:
        for x in track:
            track_result.append(str(x.name))
    return album_result
    # track_result
    

def get_playlists_tracks_popularity():
    user = session.get_user_playlists(user_id)
    tracks = []
    for x in user:
        playlist = session.get_playlist_tracks(x.id)
        for song in playlist:
            tracks.append({'name': song.name, 'popularity': song.popularity})
    return tracks

def add_track_to_favorites(track_id):
    favorites.add_track(track_id)
    # return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 


def get_favorite_tracks():
    tracks = favorites.tracks()
    favorite_tracks = []
    for track in tracks:
        favorite_tracks.append(str(track.id)) 
    return favorite_tracks

def create_playlist(playlist_name):
    result = session.request('POST', 'users/{}/playlists'.format(user_id), data={'title': playlist_name})
    return result

def get_user_playlists():
    user_playlists = session.get_user_playlists(user_id)
    playlists = []
    for i, ps in enumerate(user_playlists):
        print('[' +str(i)+ '] '+ps.name)
        playlists.append(ps.name)
    return playlists
    

def add_tracks_to_playlist(tracks, playlist):
    playlists = session.get_user_playlists(user_id)
    track_id_list = tracks
    to_index = 0
    etag = session.request('GET', 'playlists/{}'.format(playlists[playlist].id)).headers['ETag']
    headers = {'if-none-match': etag}
    data = {
        'trackIds': ','.join(track_id_list),
        'toIndex': to_index
    }
    session.request('POST', 'playlists/{}/tracks/'.format(playlists[playlist].id), data = data, headers = headers)

def get_user_picture():
    country_code = session.country_code
    user = session.request('GET', '/v1/users/{}?countryCode={}'.format(user_id, country_code), headers = {'authorization': 'Bearer {}'.format(access_token)})
    return user.content 

def get_playback_info(track_id):    
    stream_link = session.request('GET', 'https://api.tidal.com/v1/tracks/{}/playbackinfopostpaywall?&audioquality=LOSSLESS&playbackmode=STREAM&assetpresentation=FULL'.format(track_id), headers = {'authorization': 'Bearer {}'.format(access_token)})
    return stream_link.content





