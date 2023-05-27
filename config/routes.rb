Rails.application.routes.draw do  
  namespace :api do
    namespace :v1 do
      get 'results/index'
      post 'results/create'
      get 'results/show'
      get 'results/destroy'
      get 'courses/index'
      post 'courses/create'
      get 'courses/show'
      get 'courses/destroy'
      get 'students/index'
      post 'students/create'
      get '/show/:id', to: 'students#show'
      delete 'students/destroy/:id', to: 'students#destroy'
      delete 'courses/destroy/:id', to: 'courses#destroy'
    end
  end
root 'homepage#index'
get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
