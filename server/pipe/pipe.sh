#!/bin/sh

# Read FIFO && execute lines
while true; do eval "$(cat workerpipe)" ; done