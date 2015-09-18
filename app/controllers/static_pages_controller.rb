class StaticPagesController < ApplicationController

  def front
  end

  def search
    client = Yelp::Client.new({
      consumer_key: 'W1BjNrPnZRlvG6kJaa3dQg',
      consumer_secret: 'OI7kyEW_uuVw5G3nZZodfY6BjqA',
      token: '-eERvtTjNeTI4CbOblkP34eAii7JLLpr',
      token_secret: '9EdVIozIGN_vVRoPTak84QPKxhQ'
    })

    response = client.search('San Francisco')
    @response = response.to_json
    debugger


    # // Consumer Key	W1BjNrPnZRlvG6kJaa3dQg
    # // Consumer Secret	OI7kyEW_uuVw5G3nZZodfY6BjqA
    # // Token	-eERvtTjNeTI4CbOblkP34eAii7JLLpr
    # // Token Secret	9EdVIozIGN_vVRoPTak84QPKxhQ

  end

end
