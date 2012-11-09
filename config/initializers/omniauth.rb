Rails.application.config.middleware.use OmniAuth::Builder do
    provider :twitter, 'WaFmvGvcxxHB2LMw0DUYUQ', 'J7LQDLNaPvfPQSZzuSp2pNAGmr9JzTdi4uE9AUP0'
    provider :facebook, '106657282828028', 'c60985254c90cf4178091301667b5827'
end