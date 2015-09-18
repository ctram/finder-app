Rails.application.routes.draw do
  get '/', to: 'static_pages#front'
  get '/search', to: 'static_pages#search'
end
