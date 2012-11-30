Rails.application.config.middleware.use OmniAuth::Builder do
    provider :twitter, '2mC38IHfiERlAkqEUQIMRQ', '1UCjEe5umTxRcOX8RGCmLGxvyJ1rCDOxLRT7QAPOjk8'
    provider :facebook, '131116330377094', '364064c799ae41aa5463f3e181e55e84'
end