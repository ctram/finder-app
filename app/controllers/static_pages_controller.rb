class StaticPagesController < ApplicationController

  def front
  end

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

    response = client.search('San Francisco')
    # debugger

    render json: response.to_json

  end

end
