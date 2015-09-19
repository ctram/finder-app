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
      # response = client.search(params[:query], yelp_params)
      if params[:nearbyCoor]
        yelp_params = {
          'term' => params[:query]
        }

        # 37.766606, -122.430713
        # sf_coor = {latitude: 37.766606, longitude: -122.430713}
        arr_coor = params[:nearbyCoor].split(',')
        lat = arr_coor.first.to_f
        lng = arr_coor.last.to_f

        coordinates = {latitude: lat, longitude: lng}
        response = client.search_by_coordinates(coordinates, yelp_params)
      else
        response = client.search(params[:query])
      end
    end

    render json: response.to_json
  end
end
