from flask import Blueprint, jsonify, request
from sqlalchemy.orm import subqueryload, joinedload
from sqlalchemy import func
from .models import db, Playlist, Track
import requests
import json
from flask_jwt_extended  import jwt_required

from flask_cors import CORS

from server.models import db, Playlist

playlists = Blueprint('playlists', __name__)


@playlists.route('/list/post', methods=["POST"])
def post_playlists_tracks():
    data = json.loads(request.data)
    playlist_id=data["playlist_id"]
    track_id=data["track_id"]
    
    model_playlist = Playlist.query.filter(Playlist.id == playlist_id).first()
    model_track = Track.query.filter(Track.id == track_id).first()

    playlist_list = json.loads(model_playlist.playlist_list)
    print("playlist_list00000000000000000000000000",playlist_list)
    playlist_list.append(model_track.id)
    playlist_list_string = json.dumps(playlist_list)
    print("playlist_list11111111111111111111111111",playlist_list_string)
    model_playlist.playlist_list = playlist_list_string
 
    db.session.commit()
    return jsonify(Goodjob='you posted to a playlist')


@playlists.route('/post', methods=["POST"])
def post_playlist():

    data = json.loads(request.data)
    playlist = Playlist(
        user_id=data["user_id"],
        playlist_name=data["playlist_name"],
        playlist_list="[]"
    )
    db.session.add(playlist)
    db.session.commit()
    return jsonify(Goodjob='you posted a playlist to the db')


@playlists.route("/<id>", methods=["GET"])
def get_user_playlists_sort_by_playlist_name(id):

    model_playlists = Playlist.query.filter(Playlist.user_id == id).all()
    playlists = []
    for model_playlist in model_playlists:
        playlist = model_playlist.to_dict()
        playlists.append(playlist)
    return jsonify(sorted(playlists, key=lambda i: i["playlist_name"].lower()))
