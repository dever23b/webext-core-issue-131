#!/bin/bash

KEYRING_PATH="/etc/apt/keyrings"
KEYRING_FILE="${KEYRING_PATH}/packages.mozilla.org.asc"
REPO_PATH="/etc/apt/sources.list.d"
REPO_FILE="${REPO_PATH}/mozilla.sources"
FINGERPRINT="35BAA0B33E9EB396F59CA838C0BA5CE6DC6315A3"

function runAsRoot() {
  if [ $EUID != 0 ]; then
    echo "Must be run as root" >&2
    exit 1
  fi
}

function createConfigDir() {
  if ! command -v realpath > /dev/null 2>&1; then
    echo "realpath not available for resolution"
    exit 1
  fi

  local path=$( realpath ~/.gnupg )

  if [ -d "$path" ]; then
    echo "Found GPG config directory: ${path}"
  else
    echo "Creating GPG config directory: ${path}"
    mkdir -p "$path"
  fi
}

function addPreference() {
  local out="/etc/apt/preferences.d/mozilla"
  echo "Creating priority file: ${out}"
  cat <<- EOF | tee "${out}"
Package: *
Pin: origin packages.mozilla.org
Pin-Priority: 1000
EOF
}

function addRepository() {
  echo "Adding repository"
  cat <<- EOF | tee "${REPO_FILE}"
Types: deb
URIs: https://packages.mozilla.org/apt
Suites: mozilla
Components: main
Signed-By: ${KEYRING_FILE}
EOF
}

function getFingerprint() {
  #echo "Getting signing key fingerprint..."
  gpg -n -q --import --import-options import-show "${KEYRING_FILE}" | awk '/pub/{getline; gsub(/^ +| +$/,""); print $0}'
}

function getSigningKey() {
  echo "Adding Mozilla signing key..."
  install -d -m 0755 "$KEYRING_PATH"
  wget -q https://packages.mozilla.org/apt/repo-signing-key.gpg -O- | tee "$KEYRING_FILE" > /dev/null  
}

function installFirefox() {
  echo "Updating repositories..."
  apt-get update
  echo "Installing..."
  apt-get install -y firefox-devedition
}

function verifySigningKey() {
  echo "Verifying signing key..."
  # https://support.mozilla.org/en-US/kb/install-firefox-linux#w_install-firefox-deb-package-for-debian-based-distributions
  local fingerprint=$(getFingerprint)

  if [ "${fingerprint}" == "${FINGERPRINT}" ]; then
    echo "Fingerprint verified successfully: ${fingerprint}"
  else
    echo "Fingerprint verification failed: ${fingerprint}"
    unlink "${KEYRING_FILE}"
    exit 1
  fi
}

runAsRoot
createConfigDir
getSigningKey
verifySigningKey
addRepository
addPreference
installFirefox