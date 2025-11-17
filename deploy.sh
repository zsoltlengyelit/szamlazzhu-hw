#!/usr/bin/env bash
set -e

REMOTE_HOST="szamlazzhu-demo-server"

# Deploy a service to the remote host
# Args: service_dir, docker_tag, output_dir, tar_filename, port, service_name
deploy_service() {
  local service_dir=$1
  local docker_tag=$2
  local output_dir=$3
  local tar_filename=$4
  local port=$5
  local service_name=$6

  echo "Deploying $service_name..."

  pushd "$service_dir"

  docker build -t "$docker_tag" --build-arg PORT="$port" .
  mkdir -p "$output_dir"
  docker save -o "$output_dir/$tar_filename" "$docker_tag"

  scp "$output_dir/$tar_filename" "$REMOTE_HOST:/opt/szamlazzhu/$tar_filename"

  ssh "$REMOTE_HOST" "cd /opt/szamlazzhu && \
    docker load -i $tar_filename"

  popd

  echo "$service_name deployed successfully!"
}

scp "compose.yaml" "$REMOTE_HOST:/opt/szamlazzhu/compose.yaml"

# Deploy backend
deploy_service "backend" "zsoltlengyelit:szamlazzhu" "target" "szamlazzhu.tar" "8080" "szamlazzhu-service"

# Deploy frontend
deploy_service "frontend" "zsoltlengyelit:szamlazzhu-web" "dist" "szamlazzhu-web.tar" "4200" "szamlazzhu-service-web"

 ssh "$REMOTE_HOST" "cd /opt/szamlazzhu && docker compose up -d --force-recreate"