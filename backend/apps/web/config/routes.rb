root to: 'books#index'

get '/users/sign_up', to: 'sign_up#new'
post '/users/sign_up', to: 'sign_up#perform', as: :sign_up
get '/users/sign_in', to: 'sign_in#new'
post '/users/sign_in', to: 'sign_in#perform', as: :sign_in
get '/users/sign_out', to: 'sign_out#perform', as: :sign_out

resources :books, only: %i[index new create show] do
  member do
    post :receive
    get :setup_webhook
  end

  resources :branches do
    resources :chapters
  end
end

get '/books', to: 'books#setup_webhook'
get '/books/:id', to: 'books#show'
get '/books/branches/:id', to: 'books/branches#show'
get '/books/branches/chapters/:id', to: 'books/branches/chapters#show'

options '/graphql', to: 'graphql#run'
post '/graphql', to: 'graphql#run'