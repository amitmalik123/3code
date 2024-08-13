set -xe

docker run --rm -e GOOS=darwin -v "%cd%:/xk6" grafana/xk6:0.9.2 build v0.47.0 ^
  --with github.com/Dynatrace/xk6-output-dynatrace@937e4bf7ebe93754a923b58cb573917b201f15df ^
  --with github.com/grafana/xk6-dashboard@v0.6.1
