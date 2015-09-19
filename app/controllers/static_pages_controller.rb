class StaticPagesController < ApplicationController

  def search
    # // Consumer Key	W1BjNrPnZRlvG6kJaa3dQg
    # // Consumer Secret	OI7kyEW_uuVw5G3nZZodfY6BjqA
    # // Token	-eERvtTjNeTI4CbOblkP34eAii7JLLpr
    # // Token Secret	9EdVIozIGN_vVRoPTak84QPKxhQ

    # TODO:hard code credentials for now, move/safeguard later


    client = Yelp::Client.new({
      consumer_key: 'W1BjNrPnZRlvG6kJaa3dQg',
      consumer_secret: 'OI7kyEW_uuVw5G3nZZodfY6BjqA',
      token: '-eERvtTjNeTI4CbOblkP34eAii7JLLpr',
      token_secret: '9EdVIozIGN_vVRoPTak84QPKxhQ'
    })

    if params[:query].nil?
      response = client.search('San Francisco')
    else
      response = client.search(params[:query])
    end

    render json: response.to_json
  end

  def location_to_geocode
    search_location = params[:search_location]

    gmaps_api_url = "https://maps.googleapis.com/maps/api/geocode/json?address="

    search_location = search_location.split.join('+')
    complete_url = gmaps_api_url + search_location + '&key=' + api_key
    uri = URI(complete_url)
    response = JSON.parse(Net::HTTP.get(uri))
    render json: response
  end

end
